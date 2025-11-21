import React from 'react';

/**
 * IconBase
 * Generic wrapper for technology / brand icons providing:
 *  - Size control (semantic sizes or numeric pixels)
 *  - Color class hookup (.tech-icon--{key})
 *  - Accessibility (role="img" + aria-label OR decorative hiding)
 *  - Optional title element injection for SVG children
 *  - Consistent class composition
 *
 * Props:
 *  - name: canonical tech/brand key (used for color class + default label)
 *  - label / title: accessible text (title aliases label). If decorative, hidden.
 *  - decorative: boolean -> aria-hidden + no label
 *  - size: 'sm' | 'md' | 'lg' | 'xl' | number (pixels) (default md)
 *  - color: override key for color class (defaults to name)
 *  - className: extra classes
 *  - as: element/component override (default 'span')
 *  - children: SVG element or icon node
 */
const sizeScale = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48
};

const IconBase = ({
  name,
  label,
  title,
  decorative = false,
  size = 'md',
  color,
  className = '',
  as: Component = 'span',
  children,
  ...rest
}) => {
  const finalLabel = decorative ? undefined : (label || title || name || 'icon');
  const pxSize = typeof size === 'number' ? size : (sizeScale[size] || sizeScale.md);
  const colorKey = (color || name || '').toLowerCase();
  const classes = [
    'tech-icon',
    colorKey && `tech-icon--${colorKey}`,
    className
  ].filter(Boolean).join(' ');

  // Clone child SVG to enforce sizing & accessibility attributes
  let content = children;
  if (children && React.isValidElement(children)) {
    const svgProps = {
      width: pxSize,
      height: pxSize,
      'aria-hidden': decorative ? 'true' : undefined,
      focusable: 'false',
      // Preserve existing className but avoid duplication
      className: [children.props.className].filter(Boolean).join(' ')
    };
    // Inject <title> for screen readers if label present and element is SVG
    if (!decorative && finalLabel && children.type === 'svg') {
      content = React.cloneElement(children, svgProps, [
        <title key="icon-title">{finalLabel}</title>,
        ...React.Children.toArray(children.props.children)
      ]);
    } else {
      content = React.cloneElement(children, svgProps);
    }
  }

  return (
    <Component
      className={classes}
      role={decorative ? undefined : 'img'}
      aria-label={finalLabel}
      aria-hidden={decorative ? 'true' : undefined}
      style={{ width: pxSize, height: pxSize }}
      {...rest}
    >
      {content}
    </Component>
  );
};

export default IconBase;