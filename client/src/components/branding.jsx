import { cn } from "../lib/utils";
import { Link } from "@tanstack/react-router";

const Branding = ({
  variant = "logo-name",
  logoSrc = "logo.png",
  name = "SideTrack",
  altText = "SideTrack Logo",
  ...props
}) => {
  return (
    <Link
      className={cn(
        "p-2 flex items-center space-x-2 bg-base-100 rounded-xl shadow-xl",
        props.className,
      )}
      to="/"
    >
      {(variant === "logo-only" || variant === "logo-name") && (
        <img src={logoSrc} alt={altText} className="h-8 w-auto rounded-full" />
      )}
      {(variant === "name-only" || variant === "logo-name") && (
        <span className={`font-bold text-xl`}>{name}</span>
      )}
    </Link>
  );
};

export default Branding;
