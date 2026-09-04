# Contributing to MEOCY Photography Studio

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally: `git clone https://github.com/YOUR-USERNAME/meocy.git`
3. **Create a feature branch**: `git checkout -b feature/your-feature-name`
4. **Set up local development** following [QUICKSTART.md](./QUICKSTART.md)

## Development Workflow

### Code Style

- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **ESLint** for code quality
- **Prettier** for code formatting (configured in Next.js)

### Component Guidelines

```typescript
// Use 'use client' for client-side components
'use client';

import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('section');
  
  return (
    <div className="p-4 bg-white dark:bg-gray-800">
      <h1>{t('title')}</h1>
    </div>
  );
}
```

### Translation Workflow

1. Add English text to `messages/en.json`
2. Add Italian translation to `messages/it.json`
3. Add French translation to `messages/fr.json`
4. Use with `const t = useTranslations('namespace'); t('key')`

### Testing Changes

Before submitting a PR:

```bash
# Build the project
npm run build

# Check for TypeScript errors
npm run type-check

# Test locally
npm run dev
npm run api:dev
```

## Commit Guidelines

Write clear commit messages following the format:

```
Type: Brief description

Longer explanation if needed. Explain WHY not just WHAT.

- List any breaking changes
- List any new dependencies
```

**Types:**
- `feat:` A new feature
- `fix:` A bug fix
- `docs:` Documentation changes
- `style:` Formatting changes (no code changes)
- `refactor:` Code refactoring without feature changes
- `perf:` Performance improvements
- `test:` Adding or updating tests
- `chore:` Dependency updates or build changes

**Example:**
```
feat: Add date picker for booking preferences

Users can now select preferred dates when booking. 
The date picker prevents selecting already-booked dates.

- Add DatePicker component
- Add date conflict validation
- Update BookingForm to use new component
```

## Pull Request Process

1. **Describe your changes** in the PR description
2. **Link related issues** if applicable
3. **Keep PRs focused** - one feature per PR
4. **Update documentation** if needed
5. **Test thoroughly** before submitting

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update

## How to Test
Steps to verify the changes work

## Screenshots
If UI changes, include screenshots

## Checklist
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] Tested locally
- [ ] No console errors
```

## Architecture Guidelines

### Frontend Structure

```
Components should be:
- Reusable across the app
- Small and focused (single responsibility)
- Properly typed with TypeScript
- Support both light and dark modes
```

### Backend Structure

```
API endpoints should:
- Use consistent error handling
- Validate all inputs
- Return consistent JSON responses
- Include proper CORS headers
- Log important events
```

### Database Changes

```
Schema changes must:
- Include migration SQL files
- Update documentation
- Consider backward compatibility
- Include appropriate indexes
```

## Areas to Contribute

### High Priority
- [ ] Add booking calendar date picker
- [ ] Admin dashboard for managing bookings
- [ ] Email template improvements
- [ ] More detailed portfolio pages
- [ ] Client testimonials section

### Medium Priority
- [ ] Social media integration (Instagram feed)
- [ ] Payment integration (Stripe/PayPal)
- [ ] Analytics (Google Analytics, etc.)
- [ ] SEO optimization
- [ ] Mobile app version

### Nice to Have
- [ ] Dark mode improvements
- [ ] Animations and transitions
- [ ] Booking status tracking for clients
- [ ] More language support
- [ ] Blog or news section

## Code Review Process

1. At least one maintainer will review your PR
2. Address feedback or discuss concerns
3. Once approved, your PR will be merged
4. Your contribution will be live on next deployment!

## Reporting Issues

Found a bug? Create an issue with:

1. **Title**: Clear and descriptive
2. **Environment**: OS, browser, Node version
3. **Steps to reproduce**: Exact steps to see the issue
4. **Expected behavior**: What should happen
5. **Actual behavior**: What actually happens
6. **Screenshots**: If applicable

## Questions?

- 📧 Email: hello@meocy.com
- 💬 GitHub Discussions: (if enabled)
- 🐛 GitHub Issues: https://github.com/Nezsig/meocy/issues

## Code of Conduct

- Be respectful and inclusive
- No harassment or discrimination
- Constructive feedback only
- Respect intellectual property

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

Thank you for helping make MEOCY better! 🎉
