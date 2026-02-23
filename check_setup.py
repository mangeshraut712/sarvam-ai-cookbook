import argparse
import os
import subprocess
import sys
from typing import Iterable


def load_dotenv_if_available() -> None:
    try:
        from dotenv import load_dotenv

        load_dotenv()
    except ImportError:
        return


def parse_version(raw_version: str) -> tuple[int, int, int]:
    cleaned = raw_version.strip().lstrip("v")
    parts = cleaned.split(".")
    padded = (parts + ["0", "0"])[:3]
    try:
        return int(padded[0]), int(padded[1]), int(padded[2])
    except ValueError:
        return 0, 0, 0


def check_python(min_version: tuple[int, int]) -> bool:
    current = sys.version_info[:3]
    if current < (min_version[0], min_version[1], 0):
        print(
            "[FAIL] Python version too old: "
            f"{current[0]}.{current[1]}.{current[2]} "
            f"(requires >= {min_version[0]}.{min_version[1]})"
        )
        return False

    print(
        "[OK] Python version: "
        f"{current[0]}.{current[1]}.{current[2]} "
        f"(>= {min_version[0]}.{min_version[1]})"
    )
    return True


def check_node(min_version: tuple[int, int]) -> bool:
    try:
        result = subprocess.run(
            ["node", "--version"],
            check=True,
            capture_output=True,
            text=True,
        )
    except (FileNotFoundError, subprocess.CalledProcessError):
        print("[FAIL] Node.js is not available in PATH")
        return False

    current = parse_version(result.stdout)
    required = (min_version[0], min_version[1], 0)
    if current < required:
        print(
            "[FAIL] Node.js version too old: "
            f"{current[0]}.{current[1]}.{current[2]} "
            f"(requires >= {min_version[0]}.{min_version[1]})"
        )
        return False

    print(
        "[OK] Node.js version: "
        f"{current[0]}.{current[1]}.{current[2]} "
        f"(>= {min_version[0]}.{min_version[1]})"
    )
    return True


def missing_vars(names: Iterable[str]) -> list[str]:
    return [name for name in names if not os.environ.get(name)]


def check_env_vars(
    required: Iterable[str],
    recommended: Iterable[str] | None = None,
    strict: bool = False,
) -> bool:
    recommended = list(recommended or [])

    missing_required = missing_vars(required)
    if missing_required:
        print("[FAIL] Missing required environment variables:")
        for name in missing_required:
            print(f"  - {name}")
        return False

    print("[OK] Required environment variables are set")

    missing_recommended = missing_vars(recommended)
    if missing_recommended:
        status = "[FAIL]" if strict else "[WARN]"
        print(f"{status} Missing recommended environment variables:")
        for name in missing_recommended:
            print(f"  - {name}")
        return not strict

    if recommended:
        print("[OK] Recommended environment variables are set")

    return True


def run_target_checks(target: str, strict: bool) -> bool:
    success = True

    # 2026 baseline for active project tooling.
    success = check_python((3, 11)) and success

    if target in {"showcase", "podcast", "all"}:
        success = check_node((20, 0)) and success

    if target == "core":
        success = check_env_vars(required=["SARVAM_API_KEY"], strict=strict) and success
    elif target == "showcase":
        success = check_env_vars(required=["SARVAM_API_KEY"], strict=strict) and success
    elif target == "podcast":
        success = (
            check_env_vars(
                required=[
                    "SARVAM_API_KEY",
                    "MISTRAL_API_KEY",
                    "UPLOADTHING_TOKEN",
                ],
                recommended=["REDIS_URL", "INNGEST_SIGNING_KEY"],
                strict=strict,
            )
            and success
        )
    elif target == "all":
        success = (
            check_env_vars(
                required=[
                    "SARVAM_API_KEY",
                    "MISTRAL_API_KEY",
                    "UPLOADTHING_TOKEN",
                ],
                recommended=["REDIS_URL", "INNGEST_SIGNING_KEY"],
                strict=strict,
            )
            and success
        )

    return success


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Validate local environment for Sarvam AI Cookbook targets."
    )
    parser.add_argument(
        "--target",
        choices=["core", "showcase", "podcast", "all"],
        default="core",
        help="Validation target (default: core)",
    )
    parser.add_argument(
        "--strict",
        action="store_true",
        help="Treat recommended environment variables as required",
    )

    args = parser.parse_args()

    print(f"Checking Sarvam AI Cookbook setup for target: {args.target}")
    load_dotenv_if_available()

    if run_target_checks(args.target, strict=args.strict):
        print("\nSetup verification passed.")
        return

    print("\nSetup verification failed.")
    sys.exit(1)


if __name__ == "__main__":
    main()
