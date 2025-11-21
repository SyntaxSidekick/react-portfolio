import React from "react";

/**
 * Reusable CTA button with consistent styling
 * @param {string} href - Link URL
 * @param {string} icon - Font Awesome icon class
 * @param {string} title - Main title text
 * @param {string} subtitle - Smaller descriptive text
 * @param {string} ariaLabel - Accessibility label
 * @param {string} className - Additional CSS classes
 */
const CTAButton = ({
  href,
  icon,
  title,
  subtitle,
  ariaLabel,
  className = "",
  trailingIcon = "fas fa-arrow-right",
  variant,
}) => {
  const label = ariaLabel || title;

  const VARIANT_CLASS = {
    portfolio: "portfolio-cta-button",
    blog: "blog-cta-button",
    bio: "bio-cta-button",
    codepen: "portfolio-cta-button",
    github: "github-cta-button",
    primary: "btn-primary",
    secondary: "btn-secondary",
  };

  const resolvedVariantClass = variant && VARIANT_CLASS[variant];
  const classes = [className, resolvedVariantClass].filter(Boolean).join(" ");

  const gradientVariants = ["portfolio", "blog", "bio", "codepen", "github"]; // use rich markup
  const isGradient = variant && gradientVariants.includes(variant);

  if (isGradient) {
    return (
      <a href={href} className={classes} aria-label={label}>
        <span className="cta-content">
          {icon && <i className={icon} aria-hidden="true"></i>}
          <span className="cta-text">
            <strong>{title}</strong>
            {subtitle && <small>{subtitle}</small>}
          </span>
        </span>
        {trailingIcon && (
          <i className={`${trailingIcon} cta-arrow`} aria-hidden="true"></i>
        )}
      </a>
    );
  }

  // Plain button variants (primary/secondary etc.)
  return (
    <a href={href} className={classes} aria-label={label}>
      {title}
      {trailingIcon && <i className={trailingIcon} aria-hidden="true"></i>}
    </a>
  );
};

export default CTAButton;
