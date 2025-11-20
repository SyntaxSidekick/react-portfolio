# Card Mixin System Guide

## Overview
Unified card component system using SCSS mixins to eliminate repetitive card styling across the application.

## Available Mixins

### 1. `@mixin card($variant)`
Base card structure with multiple variants.

**Variants:**
- `'default'` - Standard card with border and subtle shadow
- `'elevated'` - Floating card with medium shadow, no border
- `'flat'` - Minimal card with border, no shadow
- `'outline'` - Transparent background with visible border
- `'glass'` - Glassmorphism effect with backdrop blur

**Usage:**
```scss
.my-card {
  @include card('elevated');
}
```

### 2. `@mixin card-interactive($lift)`
Adds hover/active effects to make cards clickable.

**Parameters:**
- `$lift` - How much to lift on hover (default: -4px)

**Usage:**
```scss
.project-card {
  @include card('elevated');
  @include card-interactive(-8px); // Lifts 8px on hover
}
```

### 3. `@mixin card-header`
Consistent header styling for cards.

**Usage:**
```scss
.card-header {
  @include card-header;
}
```

### 4. `@mixin card-body($padding)`
Flexible card body with flex-column layout.

**Parameters:**
- `$padding` - Custom padding (default: $padding-xl)

**Usage:**
```scss
.card-content {
  @include card-body; // Uses default padding
  // or
  @include card-body($padding-lg); // Custom padding
}
```

### 5. `@mixin card-footer`
Consistent footer styling for cards.

**Usage:**
```scss
.card-footer {
  @include card-footer;
}
```

### 6. `@mixin card-image($aspect-ratio, $hover-scale)`
Image container for cards with aspect ratio and hover zoom.

**Parameters:**
- `$aspect-ratio` - Image aspect ratio (default: 16/9)
- `$hover-scale` - Scale on hover (default: 1.05, set to 1 to disable)

**Usage:**
```scss
.project-image {
  @include card-image(math.div(16, 9), 1.07); // 16:9 with 1.07x zoom
}

.design-image {
  @include card-image(math.div(4, 3), 1.05); // 4:3 with 1.05x zoom
}
```

## Migration Examples

### Before (Repetitive)
```scss
.project-card {
  background: $color-bg-primary;
  border-radius: $radius-xl;
  overflow: hidden;
  box-shadow: $shadow-base;
  transition: all 0.4s ease;
  border: 1px solid $color-border-light;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: $shadow-xl;
    border-color: $primary;
  }
  
  .project-image {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    background: $gray-100;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }
    
    &:hover img {
      transform: scale(1.05);
    }
  }
  
  .project-content {
    padding: $padding-xl;
    display: flex;
    flex-direction: column;
    gap: $gap;
    flex: 1;
  }
}
```

### After (Using Mixins)
```scss
.project-card {
  @include card('elevated');
  @include card-interactive(-8px);
  @include flex-column;
  
  .project-image {
    @include card-image(math.div(16, 9), 1.05);
  }
  
  .project-content {
    @include card-body;
  }
}
```

**Result:** 48 lines → 11 lines (77% reduction!)

## Common Patterns

### Standard Interactive Card
```scss
.card {
  @include card; // default variant
  @include card-interactive; // default -4px lift
}
```

### Elevated Card with Large Lift
```scss
.feature-card {
  @include card('elevated');
  @include card-interactive(-12px);
}
```

### Flat Card with Image
```scss
.blog-card {
  @include card('flat');
  
  .blog-image {
    @include card-image(math.div(16, 9));
  }
  
  .blog-content {
    @include card-body;
  }
}
```

### Glass Card (Modern Style)
```scss
.hero-card {
  @include card('glass');
  @include card-interactive(-6px);
}
```

## Files Already Refactored

✅ **portfolio/_portfolio.scss**
- `.case-study-card` - Using card('elevated') + card-interactive(-8px)
- `.case-study-image` - Using card-image(16/9, 1.05)
- `.case-study-content` - Using card-body
- `.content-card` (modal) - Using card()

## Files to Refactor

### High Priority
- [ ] **home/_home.scss** - Tech skills cards, blog cards
- [ ] **bio/_bio.scss** - Experience cards, education cards
- [ ] **portfolio/_portfolio.scss** - Design cards, GitHub cards, CodePen cards

### Medium Priority
- [ ] **blog/** - Blog post cards
- [ ] **components/** - Any standalone card components

## Benefits

1. **Consistency** - All cards follow the same patterns
2. **Maintainability** - Update once, applies everywhere
3. **Code Reduction** - 70-80% less repetitive code
4. **Flexibility** - Easy to create variations with parameters
5. **Dark Mode** - Centralized dark mode handling
6. **Performance** - Smaller compiled CSS

## Best Practices

1. **Choose the right variant** - Use 'elevated' for important content, 'flat' for secondary
2. **Consistent hover effects** - Use standard lifts: -4px (small), -6px (medium), -8px (large)
3. **Image aspect ratios** - Use common ratios: 16/9, 4/3, 1/1 (square)
4. **Combine with utility mixins** - Use with flex-center, flex-column, etc.
5. **Override when needed** - Mixins provide base, you can still add custom styles

## Examples in Use

```scss
// Portfolio project card
.project-card {
  @include card('elevated');
  @include card-interactive(-8px);
  @include flex-column;
  
  .project-image {
    @include card-image(math.div(16, 9), 1.07);
  }
  
  .project-content {
    @include card-body;
    // Custom additions
    h3 { color: $primary; }
  }
}

// Blog post card
.blog-card {
  @include card; // default variant
  @include card-interactive;
  
  .blog-image {
    @include card-image(math.div(16, 9));
  }
  
  .blog-content {
    @include card-body($padding-lg); // Custom padding
  }
}

// Tech skill card
.skill-card {
  @include card('flat');
  @include card-interactive(-4px);
  
  .skill-icon {
    @include flex-center;
    width: 64px;
    height: 64px;
  }
  
  .skill-content {
    @include card-body($padding-md);
  }
}
```

## Migration Checklist

For each card component:
1. [ ] Identify card variant needed (default, elevated, flat, outline, glass)
2. [ ] Replace background/border/shadow with `@include card($variant)`
3. [ ] Add `@include card-interactive($lift)` if clickable
4. [ ] Replace image containers with `@include card-image($ratio, $scale)`
5. [ ] Replace content sections with `@include card-body($padding)`
6. [ ] Test in both light and dark modes
7. [ ] Verify hover effects work correctly
8. [ ] Check responsive behavior

## Next Steps

1. Continue refactoring portfolio cards (design-card, github-card, codepen-card)
2. Refactor home page cards (tech skills, blog previews)
3. Refactor bio page cards (experience, education, certifications)
4. Update any blog card components
5. Document any special case cards that need custom mixins
