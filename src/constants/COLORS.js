// src/constants/COLOR.js (or wherever you prefer to place it)

/**
 * Primary Brand Colors
 */
export const PRIMARY = "#8937ce"; // Your specified primary color (Purple)

/**
 * StatCard Theme Colors (Light Backgrounds & Text Colors)
 * Note: For a Next.js project using Tailwind CSS, you'll generally
 * use Tailwind utility classes (e.g., 'text-blue-700'), but defining
 * the *background* RGB/Hex values here allows for them to be used
 * directly as a style prop if not using dynamic Tailwind classes.
 *
 * The RGB values are approximations of common light Tailwind colors.
 */
export const STAT_CARD_COLORS = {
  // Total Users - Light Blue/Cyan
  BLUE_CYAN: {
    bgColor: "rgb(235, 247, 250)",
    textColor: "text-blue-700",
  },
  // Total Brands - Light Purple
  LIGHT_PURPLE: {
    bgColor: "rgb(244, 232, 255)",
    textColor: "text-purple-700",
  },
  // Total Influencers - Light Yellow
  LIGHT_YELLOW: {
    bgColor: "rgb(255, 249, 229)",
    textColor: "text-yellow-700",
  },
  // Active Storefronts - Light Green
  LIGHT_GREEN: {
    bgColor: "rgb(235, 253, 245)",
    textColor: "text-green-700",
  },
  // Total Sales Volume - Light Pink
  LIGHT_PINK: {
    bgColor: "rgb(253, 242, 248)",
    textColor: "text-pink-700",
  },
  // Pending Payouts - Deeper Yellow/Light Orange
  DEEPER_YELLOW: {
    bgColor: "rgb(254, 243, 198)",
    textColor: "text-orange-700",
  },
};
