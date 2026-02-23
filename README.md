# Sarvam AI Cookbook

[![CI](https://github.com/mangeshraut712/sarvam-ai-cookbook/actions/workflows/ci.yml/badge.svg)](https://github.com/mangeshraut712/sarvam-ai-cookbook/actions/workflows/ci.yml)
[![Python](https://img.shields.io/badge/python-3.9+-blue)](https://www.python.org/downloads/)
[![Node.js](https://img.shields.io/badge/node.js-20+-green)](https://nodejs.org/)
[![Docker](https://img.shields.io/badge/docker-ready-blue)](https://docker.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Quality](https://img.shields.io/badge/quality-enterprise-orange)](DEVELOPMENT.md)

**Enterprise-Grade Sarvam AI Reference Implementations for India-First AI Products**

This repository showcases production-ready multilingual applications built with Sarvam AI APIs. Features comprehensive CI/CD, Docker containerization, monitoring, security hardening, and enterprise-grade code quality. Perfect for teams building India-first AI products.

## ✨ Why This Repository

- 🚀 **Production-Ready**: Enterprise-grade code with comprehensive testing, security, and monitoring
- 🌍 **India-First**: Native support for 6 Indian languages with regional optimizations
- 🛠️ **Full-Stack**: End-to-end applications combining Python, Next.js, and cloud services
- 🔒 **Secure**: Advanced security features, rate limiting, input validation, and audit logging
- 📦 **Containerized**: Docker support for easy deployment and development
- 📊 **Monitored**: Health checks, logging, analytics, and performance monitoring
- 🧪 **Tested**: 29 comprehensive tests with 50%+ coverage and automated CI/CD
- 📚 **Well-Documented**: Complete API docs, development guides, and deployment instructions

## Why this repo

- Built around **Sarvam AI capabilities**: chat completion, translation, STT, TTS, and multilingual application flows.
- Contains **end-to-end apps** (Python + Next.js) and **focused notebooks** for rapid experimentation.
- Includes practical CI, deployment, and validation tooling for local + cloud delivery.
- Positioned as a **Made-in-India AI engineering kit** for teams shipping Indian-language products.

## 🏗️ **2026-Ready Enterprise Stack**

### Core Technologies
- **Python**: `3.9+` with enterprise tooling (Black, isort, mypy, pytest, coverage)
- **Node.js**: `20+` with TypeScript and Next.js 16
- **React**: `19` with modern hooks and performance optimizations
- **Databases**: SQLite, PostgreSQL, Redis with ORM support
- **Containerization**: Docker with multi-stage builds and orchestration

### AI & Cloud Services
- **Sarvam AI**: Chat, Translation, STT, TTS APIs
- **Mistral AI**: OCR and document processing
- **Inngest**: Background job processing and workflows
- **UploadThing**: File upload and storage
- **Vercel**: Deployment and hosting platform

### Quality & Security
- **Code Quality**: ESLint, Prettier, Black, Flake8, mypy
- **Testing**: pytest with 50%+ coverage, integration tests
- **Security**: Rate limiting, input validation, CORS, security headers
- **CI/CD**: GitHub Actions with matrix testing and security scanning
- **Monitoring**: Health checks, logging, analytics, error tracking

### Languages Supported 🌍
- **English**: en-IN, en-US
- **Hindi**: hi-IN, hi
- **Tamil**: ta-IN, ta
- **Telugu**: te-IN, te
- **Kannada**: kn-IN, kn
- **Malayalam**: ml-IN, ml

## 🚀 **Sarvam AI Capabilities**

| Capability | Examples | Use Cases | Languages |
|---|---|---|---|
| **🤖 Chat Completion** | `QuickStart_Chatbot`, `Multilingual_Chatbot`, `sarvam-showcase` | Conversational AI, domain Q&A, customer support | All 6 languages |
| **🌐 Translation** | `Live_Video_Transcription`, `Indic_Soundbox_AI`, notebooks | Real-time translation, content localization | All language pairs |
| **🎤 Speech-to-Text** | `stt`, `stt-translate`, `Live_Video_Transcription` | Voice interfaces, transcription services | Hindi, English |
| **🔊 Text-to-Speech** | `tts`, `sarvam-podcast-generator`, `Birthday_Song_Generator` | Voice synthesis, audio content, accessibility | All 6 languages |
| **📄 Document Processing** | `sarvam-podcast-generator`, `AI_Presentation_Architect` | PDF analysis, content extraction, automated workflows | English, Hindi |
| **🎙️ Podcast Generation** | `sarvam-podcast-generator` | Automated content-to-audio conversion | Multilingual |
| **🏗️ Full-Stack Orchestration** | `sarvam-showcase`, `sarvam-podcast-generator` | Production web apps with AI integration | All languages |

## ⚡ **Quick Start (Enhanced)**

### 1. **Clone & Setup**
```bash
git clone https://github.com/mangeshraut712/sarvam-ai-cookbook.git
cd sarvam-ai-cookbook
```

### 2. **Environment Configuration**
```bash
# Copy environment template
cp .env.example .env

# Configure required API keys
# SARVAM_API_KEY=your_sarvam_key
# Optional: MISTRAL_API_KEY, UPLOADTHING_TOKEN, etc.
```

### 3. **Development Setup**
```bash
# Install all dependencies and tools
make install

# Verify setup and run quality checks
make verify-setup
make check-all
```

### 4. **Run Examples**
```bash
# Python examples
cd examples/Travel_Planner
streamlit run app.py

# Web applications
cd examples/sarvam-showcase
npm run dev

# Docker (alternative)
docker-compose up -d
```

## 🐳 **Deployment Options**

### **Vercel (Recommended)**
```bash
# Showcase app
vercel --cwd examples/sarvam-showcase

# Podcast generator
vercel --cwd examples/sarvam-podcast-generator
```

#### Vercel Dashboard (Git Import / Monorepo)
If you import this repository from GitHub in Vercel, use these settings for the showcase app:

- `Framework Preset`: `Next.js`
- `Root Directory`: `examples/sarvam-showcase`
- `Install Command`: `npm ci`
- `Build Command`: `npm run build`

If you keep root directory at repository root, use prefix-based commands:

- `Install Command`: `npm ci --prefix examples/sarvam-showcase`
- `Build Command`: `npm ci --prefix examples/sarvam-showcase && npm run build --prefix examples/sarvam-showcase`

### **Docker Deployment**
```bash
# Build and run with Docker
docker-compose up -d

# Or individual services
docker build -f docker/Dockerfile.python -t sarvam-cookbook .
docker run -p 8501:8501 sarvam-cookbook
```

### **Cloud Platforms**
- **AWS**: ECS, Lambda, API Gateway
- **Google Cloud**: Cloud Run, App Engine
- **Azure**: Container Apps, Functions
- **Railway**: Direct Docker deployment
- **Render**: Web service deployment

## 📚 **Project Documentation**

- 📖 **[DEVELOPMENT.md](./DEVELOPMENT.md)**: Complete development guide with workflows, testing, and best practices
- 🏗️ **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)**: Detailed project architecture and organization
- 📋 **[examples/README.md](./examples/README.md)**: Comprehensive example catalog with setup instructions
- 🚀 **[DEPLOYMENT.md](./DEPLOYMENT.md)**: Deployment guides for various platforms
- 🔧 **[docker/README.md](./docker/README.md)**: Docker setup and containerization guide
- 📖 **[docs/api-guide.md](./docs/api-guide.md)**: Complete API documentation with examples
- ⚙️ **[.github/workflows/ci.yml](./.github/workflows/ci.yml)**: CI/CD pipeline configuration

## 🔍 **Quality Assurance**

### **Automated Testing**
- **29 Unit Tests**: Comprehensive test suite covering all major functionality
- **50%+ Code Coverage**: Maintained through automated CI checks
- **Integration Tests**: Live API testing with proper mocking

### **Code Quality**
- **TypeScript Strict**: Full type safety across web applications
- **Python Standards**: Black, isort, flake8, mypy compliance
- **ESLint Clean**: No JavaScript/TypeScript linting errors
- **Security Audits**: Automated vulnerability scanning

### **Performance Monitoring**
- **Health Checks**: API endpoints and service monitoring
- **Error Tracking**: Comprehensive logging and error handling
- **Analytics**: Usage tracking and performance metrics

## 🎯 **Development Commands**

### **Core Commands**
```bash
# Complete setup
make install              # Install all dependencies and tools
make verify-setup         # Validate environment configuration
make check-all           # Run all quality checks (lint, test, coverage)

# Development workflow
make format              # Format code (Black + isort)
make lint                # Run linting (flake8 + ESLint + mypy)
make test                # Run test suite
make test-coverage       # Run tests with coverage report
make clean               # Clean cache files and artifacts
```

### **Web Application Commands**
```bash
# Showcase app
cd examples/sarvam-showcase
npm run dev              # Development server
npm run build           # Production build
npm run lint            # Lint check

# Podcast generator
cd examples/sarvam-podcast-generator
npm run dev             # Development server
npm run inngest         # Start background workers
```

### **Docker Commands**
```bash
# Start full development environment
docker-compose up -d

# Build individual containers
docker build -f docker/Dockerfile.python -t sarvam-cookbook-python .
docker build -f examples/sarvam-showcase/Dockerfile -t sarvam-showcase .
```

## 🌟 **Key Features**

- ✅ **Enterprise Security**: Rate limiting, input validation, CORS, security headers
- ✅ **Production Monitoring**: Health checks, structured logging, error tracking
- ✅ **Multi-Environment**: Docker, Vercel, AWS, GCP, Azure deployment support
- ✅ **Developer Experience**: Hot reload, comprehensive tooling, clear documentation
- ✅ **Performance Optimized**: Code splitting, lazy loading, caching strategies
- ✅ **Accessibility First**: WCAG compliance, screen reader support, keyboard navigation
- ✅ **Type Safety**: Full TypeScript coverage with strict type checking
- ✅ **Automated Quality**: CI/CD with security scanning and comprehensive testing

## 🤝 **Contributing**

We welcome contributions! Please see our [Development Guide](./DEVELOPMENT.md) for detailed contribution guidelines.

### **Quick Contribution Setup**
```bash
# Fork and clone
git clone https://github.com/mangeshraut712/sarvam-ai-cookbook.git
cd sarvam-ai-cookbook

# Setup development environment
make install
make check-all

# Create feature branch
git checkout -b feature/your-feature-name
```

## 📞 **Support & Community**

- 📖 **[Documentation](https://docs.sarvam.ai)**: Official Sarvam AI docs
- 💬 **[GitHub Issues](https://github.com/mangeshraut712/sarvam-ai-cookbook/issues)**: Bug reports and feature requests
- 🎯 **[Sarvam Dashboard](https://dashboard.sarvam.ai/)**: API key management and usage analytics
- 🌐 **[Community Forum](https://community.sarvam.ai/)**: Discussions and help

## 📜 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ for the Indian AI community by the Sarvam AI team**

*Transforming India through accessible, multilingual AI technology* 🇮🇳
