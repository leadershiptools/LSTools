import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import "../BreadCrumb/breadcrumb.styles.css";

export default function BasicBreadcrumbs({ items }) {
  const handleClick = (e) => {
    e.preventDefault();
    const href = e.target.href;
    if (href) window.location.href = href;
  };
  
  return (
    <div role="tab" className="breadcrumb" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb" separator="›">
        {items?.map(({ name, link }) => {
          if (link === null) {
            return (
              <Typography className="actual" underline="hover">
                {name}
              </Typography>
            );
          }
          return (
            <Link className="ancestor" underline="hover" href={link}>
              {name}
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
}
