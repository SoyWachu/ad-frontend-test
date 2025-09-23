import React from "react";

const NextLinkMock: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => {
  return <a href={href}>{children}</a>;
};

export default NextLinkMock;
