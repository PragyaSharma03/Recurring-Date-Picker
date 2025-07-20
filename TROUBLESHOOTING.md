# Troubleshooting Guide

## Common Issues and Solutions

### 1. Autoprefixer Module Not Found Error

**Error:**
```
Error: Cannot find module 'autoprefixer'
```

**Solution:**
1. Make sure all dependencies are installed:
   ```bash
   npm install
   ```

2. If the issue persists, try clearing npm cache and reinstalling:
   ```bash
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

3. For Windows PowerShell execution policy issues:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

### 2. TypeScript Compilation Errors

**Error:**
```
Cannot find module './recurrenceStore' or its corresponding type declarations
```

**Solution:**
1. Ensure the `recurrenceStore.ts` file exists in the `src/components/` directory
2. Check that the file path in imports is correct
3. Restart the TypeScript language server in your IDE
4. Run `npx tsc --noEmit` to check for TypeScript errors

### 3. Tailwind CSS Not Working

**Symptoms:**
- Styles not applying
- Classes not recognized

**Solution:**
1. Verify Tailwind CSS is properly configured in `tailwind.config.ts`
2. Check that `globals.css` includes the proper Tailwind directives:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```
3. Ensure PostCSS configuration is correct in `postcss.config.mjs`

### 4. Jest Test Failures

**Error:**
```
Cannot find module '@testing-library/jest-dom'
```

**Solution:**
1. Install missing testing dependencies:
   ```bash
   npm install --save-dev @testing-library/jest-dom @testing-library/react @testing-library/user-event jest-environment-jsdom
   ```

2. Ensure `jest.setup.js` exists and contains:
   ```javascript
   import '@testing-library/jest-dom';
   ```

### 5. Component Not Rendering

**Symptoms:**
- Blank page
- Component not showing

**Solution:**
1. Check browser console for JavaScript errors
2. Verify all imports are correct
3. Ensure the component is properly exported
4. Check that the store is properly initialized

### 6. Date Generation Issues

**Symptoms:**
- Incorrect dates generated
- Missing dates
- Infinite loops

**Solution:**
1. Check that start date is set
2. Verify recurrence type and interval are correct
3. For weekly recurrence, ensure days of week are selected
4. For monthly patterns, verify week and day selections

### 7. Performance Issues

**Symptoms:**
- Slow rendering
- High memory usage

**Solution:**
1. Limit the number of preview dates displayed (currently capped at 20)
2. Check for infinite loops in date generation
3. Ensure proper cleanup in useEffect hooks
4. Consider implementing virtualization for large date lists

### 8. Accessibility Issues

**Symptoms:**
- Screen reader not working properly
- Keyboard navigation issues

**Solution:**
1. Verify all interactive elements have proper ARIA labels
2. Check that buttons have `aria-pressed` attributes
3. Ensure proper focus management
4. Test with keyboard navigation

### 9. Build Errors

**Error:**
```
Module not found: Can't resolve 'zustand'
```

**Solution:**
1. Install missing dependencies:
   ```bash
   npm install zustand
   ```

2. Check that all dependencies are listed in `package.json`

### 10. Development Server Issues

**Error:**
```
Port 3000 is already in use
```

**Solution:**
1. Kill the process using port 3000:
   ```bash
   npx kill-port 3000
   ```

2. Or use a different port:
   ```bash
   npm run dev -- -p 3001
   ```

## Environment Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Development Environment
1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Open http://localhost:3000

### Testing Environment
1. Run tests: `npm test`
2. Run tests in watch mode: `npm run test:watch`
3. Generate coverage report: `npm run test:coverage`

## Debugging Tips

### 1. Enable Debug Logging
Add console logs to track state changes:
```typescript
useEffect(() => {
  console.log('State changed:', { startDate, recurrenceType, interval });
}, [startDate, recurrenceType, interval]);
```

### 2. Check Store State
Use browser dev tools to inspect the Zustand store:
```typescript
// In browser console
console.log(useRecurrenceStore.getState());
```

### 3. Verify Date Calculations
Test date generation logic independently:
```typescript
// Test specific date calculations
const startDate = new Date('2024-01-15');
const result = generateDates(startDate, 'weekly', 1, [1, 3, 5]);
console.log('Generated dates:', result);
```

### 4. Component Isolation
Test components in isolation using Storybook or by creating simple test pages.

## Getting Help

If you encounter issues not covered in this guide:

1. Check the browser console for error messages
2. Review the API documentation in `API.md`
3. Run the test suite to identify issues
4. Check the GitHub issues page for similar problems
5. Create a minimal reproduction case for debugging

## Performance Monitoring

### Key Metrics to Monitor
- Component render times
- Date generation performance
- Memory usage
- Bundle size

### Optimization Strategies
- Use React.memo for expensive components
- Implement proper dependency arrays in useEffect
- Limit the number of generated dates
- Use virtualization for large lists
- Optimize date calculations

## Security Considerations

### Input Validation
- Validate all date inputs
- Sanitize user-provided data
- Prevent XSS attacks through proper escaping

### Data Handling
- Don't store sensitive information in client state
- Use HTTPS in production
- Implement proper error boundaries

## Deployment Issues

### Build Optimization
1. Ensure all dependencies are in the correct section of `package.json`
2. Check for unused imports and dependencies
3. Optimize bundle size using Next.js built-in optimizations

### Environment Variables
1. Set proper environment variables for production
2. Use `.env.local` for local development
3. Don't commit sensitive environment variables

### Static Export
If using static export, ensure all dynamic features are properly handled:
```bash
npm run build
npm run export
``` 