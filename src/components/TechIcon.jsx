import React from "react";
import IconBase from "./common/IconBase";
// Core design & dev tool icons
import PhotoshopIcon from "../assets/icons/photoshop-brands.svg?react";
import IllustratorIcon from "../assets/icons/illustrator-brands.svg?react";
import IndesignIcon from "../assets/icons/indesign-brands.svg?react";
import InvisionIcon from "../assets/icons/invision-brand.svg?react";
// Common web tech stack icons
import Html5Icon from "../assets/icons/html5.svg?react";
import Css3Icon from "../assets/icons/css3.svg?react";
import JsIcon from "../assets/icons/js.svg?react";
import ReactIcon from "../assets/icons/react.svg?react";
import SassIcon from "../assets/icons/sass.svg?react";
import PhpIcon from "../assets/icons/php.svg?react";
import NodeIcon from "../assets/icons/node-js.svg?react";
import TailwindIcon from "../assets/icons/tailwind-brands.svg?react";
import TypescriptIcon from "../assets/icons/Typescript_logo_2020.svg?react";
import GitIcon from "../assets/icons/git.svg?react";
import GulpIcon from "../assets/icons/gulp.svg?react";
import AwsIcon from "../assets/icons/aws.svg?react";
import WordpressIcon from "../assets/icons/wordpress.svg?react";
import FigmaIcon from "../assets/icons/figma.svg?react";
import VueIcon from "../assets/icons/vuejs.svg?react";
import AngularIcon from "../assets/icons/angular.svg?react";
import BootstrapIcon from "../assets/icons/bootstrap.svg?react";
import DrupalIcon from "../assets/icons/drupal.svg?react";
import MagentoIcon from "../assets/icons/magento.svg?react";
import HotjarIcon from "../assets/icons/hotjar.svg?react";
import GoogleIcon from "../assets/icons/google.svg?react";
import XdIcon from "../assets/icons/xd-brands.svg?react";
import AdobeIcon from "../assets/icons/adobe-cc-brands.svg?react";
import JQueryIcon from "../assets/icons/jquery.svg?react";
import WebpackIcon from "../assets/icons/webpack.svg?react";
import AzureIcon from "../assets/icons/microsoft-azure.svg?react";
import GoogleAnalyticsIcon from "../assets/icons/google-analytics.svg?react";
import GtmIcon from "../assets/icons/gtm.svg?react";

/**
 * TechIcon Component
 * Displays technology icons using either SVG files or Font Awesome icons
 * Automatically applies brand colors from UI kit
 * 
 * @param {Object} props
 * @param {string} props.name - Technology name (e.g., "React", "Photoshop")
 * @param {string} props.icon - Font Awesome class (e.g., "fab fa-react")
 * @param {string} props.className - Additional CSS classes
 */
/**
 * Unified TechIcon component
 * Prefers inline SVG (currentColor) for controllable theming & a11y.
 * Falls back to Font Awesome <i> if SVG not mapped.
 * Props:
 *  - name: canonical tech name (case-insensitive)
 *  - icon: optional font awesome class for fallback
 *  - title: accessible label (defaults to name)
 *  - className: additional classes
 */
const TechIcon = ({ name, icon, title, className = "", size = 'md', decorative = false }) => {
  const key = (name || "").toLowerCase();
  const svgComponents = {
    photoshop: PhotoshopIcon,
    illustrator: IllustratorIcon,
    indesign: IndesignIcon,
    invision: InvisionIcon,
    html5: Html5Icon,
    css3: Css3Icon,
    css: Css3Icon,
    javascript: JsIcon,
    js: JsIcon,
    react: ReactIcon,
    sass: SassIcon,
    scss: SassIcon,
    php: PhpIcon,
    node: NodeIcon,
    nodejs: NodeIcon,
    tailwind: TailwindIcon,
    tailwindcss: TailwindIcon,
    typescript: TypescriptIcon,
    git: GitIcon,
    gulp: GulpIcon,
    aws: AwsIcon,
    wordpress: WordpressIcon,
    figma: FigmaIcon,
    vue: VueIcon,
    vuejs: VueIcon,
    angular: AngularIcon,
    angularjs: AngularIcon,
    bootstrap: BootstrapIcon,
    drupal: DrupalIcon,
    magento: MagentoIcon,
    hotjar: HotjarIcon,
    google: GoogleIcon,
    analytics: GoogleIcon,
    xd: XdIcon,
    adobexd: XdIcon,
    adobe: AdobeIcon,
    adobecc: AdobeIcon,
    jquery: JQueryIcon,
    webpack: WebpackIcon,
    azure: AzureIcon,
    'google-analytics': GoogleAnalyticsIcon,
    gtm: GtmIcon,
  };

  const IconComponent = svgComponents[key];
  const label = title || name;

  if (IconComponent) {
    return (
      <IconBase
        name={key}
        label={label}
        size={size}
        decorative={decorative}
        className={className}
      >
        <IconComponent />
      </IconBase>
    );
  }

  // Fallback: font icon preserves existing usage until migrated.
  if (icon) {
    return (
      <IconBase
        name={key}
        label={label}
        size={size}
        decorative={decorative}
        className={`fa-icon ${className}`}
      >
        <i className={icon} />
      </IconBase>
    );
  }

  return null;
};

export default TechIcon;
