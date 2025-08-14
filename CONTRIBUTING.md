# Contributing to NgCropper

Thank you for your interest in contributing to NgCropper! This document provides guidelines and information for contributors.

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/ng-cropper.git
   cd ng-cropper
   ```
3. **Install dependencies**:
   ```bash
   pnpm install
   ```
4. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 🛠️ Development Workflow

### Running the Development Environment

```bash
# Start the playground application
pnpm dev

# Start Storybook for component development
pnpm storybook

# Build the library
pnpm build:lib

# Run tests
pnpm test:lib

# Run linting
pnpm lint
```

### Project Structure

```
ng-cropper/
├── apps/
│   └── ng-cropper-playground/     # Demo application
├── libs/
│   └── ng-cropper/               # Main library code
│       ├── src/
│       │   ├── lib/
│       │   │   ├── NgCropper/    # Main component
│       │   │   ├── components/   # Sub-components
│       │   │   └── providers/    # Services
│       │   └── index.ts          # Public API
│       └── README.md             # Library documentation
└── .github/
    └── workflows/                # CI/CD workflows
```

## 📝 Code Standards

### Code Style
- Follow Angular and TypeScript best practices
- Use meaningful variable and function names
- Add type annotations where helpful
- Follow the existing code style in the project

### Commit Messages
We use conventional commit messages:
- `feat:` new features
- `fix:` bug fixes
- `docs:` documentation changes
- `style:` formatting changes
- `refactor:` code refactoring
- `test:` adding tests
- `chore:` maintenance tasks

Example: `feat: add crop aspect ratio validation`

### Testing
- Write tests for new features and bug fixes
- Ensure all existing tests pass
- Test coverage should not decrease
- Run tests with: `pnpm test:lib`

### Documentation
- Update relevant documentation for new features
- Include JSDoc comments for public APIs
- Update Storybook stories for component changes
- Ensure README is up to date

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Description**: Clear description of the issue
2. **Steps to reproduce**: Detailed steps to reproduce the bug
3. **Expected behavior**: What you expected to happen
4. **Actual behavior**: What actually happened
5. **Environment**: Angular version, browser, OS
6. **Code example**: Minimal reproducible example if possible

## ✨ Feature Requests

For new features:

1. **Check existing issues** to avoid duplicates
2. **Describe the use case** and motivation
3. **Provide examples** of how the feature would be used
4. **Consider backward compatibility**

## 🔄 Pull Request Process

1. **Update documentation** for any new features
2. **Add or update tests** as needed
3. **Run the full test suite**:
   ```bash
   pnpm lint
   pnpm test:lib
   pnpm build:lib
   ```
4. **Update CHANGELOG.md** if applicable
5. **Create a clear PR description** explaining the changes

### PR Checklist

- [ ] Code follows the project's style guidelines
- [ ] Self-review of code completed
- [ ] Tests added/updated and passing
- [ ] Documentation updated
- [ ] No breaking changes (or clearly documented)
- [ ] Commit messages follow conventional format

## 📋 Development Setup

### Prerequisites

- Node.js (>=18.0.0)
- pnpm (>=8.0.0)
- Git

### IDE Setup

We recommend using VS Code with these extensions:
- Angular Language Service
- Prettier
- ESLint
- TypeScript Hero

## 🏗️ Building and Testing

```bash
# Full build and test pipeline
pnpm prepare:release

# Individual commands
pnpm build:lib          # Build library
pnpm build:app          # Build playground
pnpm storybook:build    # Build Storybook
pnpm test               # Run all tests
pnpm lint               # Lint code
pnpm format             # Format code
```

## 🤝 Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help maintain a welcoming environment
- Follow GitHub's Community Guidelines

## ❓ Questions?

If you have questions:

1. Check existing [GitHub issues](https://github.com/DanielGabbay/ng-cropper/issues)
2. Open a new issue with the "question" label
3. Join discussions in existing PRs

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- GitHub contributors page

Thank you for contributing to NgCropper! 🎉