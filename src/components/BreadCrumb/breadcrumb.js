import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import "../BreadCrumb/breadcrumb.styles.css"

function handleClick(event) {
  event.preventDefault();
  // insert redirect to the last URL 
}

export default function BasicBreadcrumbs() {
  return (
    <div role="tab" className='breadcrumb' onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb" separator="›">
        <Link 
        className='ancestor'
        underline="hover"
        href="/">
          Team
        </Link>
        <Link
          className='ancestor'
          underline="hover"
          href="/"
        >
          Marketing
        </Link >
        <Typography className='actual'underline="hover">
          Amedia Earhart
        </Typography>
      </Breadcrumbs>
    </div>
  );
}