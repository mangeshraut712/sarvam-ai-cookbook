'use client';

import { useLanguage } from '@/lib/i18n';
import { useEffect, useState } from 'react';

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const { setLanguage, t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Skip to main content functionality
  const skipToMain = () => {
    const main = document.getElementById('main-content');
    if (main) {
      main.focus();
      main.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Keyboard shortcuts for accessibility
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Alt + L: Focus language selector
      if (event.altKey && event.key === 'l') {
        event.preventDefault();
        const langSelect = document.querySelector('[data-language-select]');
        if (langSelect instanceof HTMLElement) {
          langSelect.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // High contrast mode detection
  const [prefersHighContrast, setPrefersHighContrast] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-contrast: high)');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPrefersHighContrast(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersHighContrast(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Reduced motion detection
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Apply accessibility classes to body
  useEffect(() => {
    const classes = [];
    if (prefersHighContrast) classes.push('high-contrast');
    if (prefersReducedMotion) classes.push('reduced-motion');

    document.body.className = classes.join(' ');
  }, [prefersHighContrast, prefersReducedMotion]);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Skip to main content link - only visible when focused */}
      <a
        href="#main-content"
        onClick={skipToMain}
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md focus:shadow-lg"
      >
        {t('a11y.skip.to.main')}
      </a>

      {/* Screen reader announcements for theme changes */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        id="theme-announcer"
      >
        Theme functionality available
      </div>

      {children}
    </>
  );
}

// Custom hook for accessibility features
export function useAccessibility() {
  const { t } = useLanguage();

  return {
    // Generate accessible button props
    getButtonProps: (props: {
      label?: string;
      description?: string;
      isDisabled?: boolean;
      isLoading?: boolean;
    } = {}) => ({
      'aria-label': props.label,
      'aria-describedby': props.description,
      'aria-disabled': props.isDisabled,
      'aria-busy': props.isLoading,
      disabled: props.isDisabled,
    }),

    // Generate accessible input props
    getInputProps: (props: {
      label?: string;
      error?: string;
      required?: boolean;
      description?: string;
    } = {}) => ({
      'aria-label': props.label,
      'aria-required': props.required,
      'aria-invalid': !!props.error,
      'aria-describedby': props.error ? `${props.label}-error` : props.description,
    }),

    // Generate accessible dialog props
    getDialogProps: (props: {
      title?: string;
      description?: string;
      isOpen: boolean;
    }) => ({
      role: 'dialog',
      'aria-modal': true,
      'aria-labelledby': props.title,
      'aria-describedby': props.description,
      'aria-hidden': !props.isOpen,
    }),

    // Translation helper
    t,
  };
}
