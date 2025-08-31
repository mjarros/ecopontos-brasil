"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { cloneElement, ReactElement } from "react";

type ActiveLinkProps = LinkProps & {
  children: ReactElement;
  activeClassName: string;
};

export default function ActiveLink({ children, activeClassName, ...rest }: ActiveLinkProps) {
  const pathName = usePathname();
  const newClassName = `${children.props.className} ${activeClassName}`;
  const className = pathName === rest.href ? newClassName : "";

  return <Link {...rest}>{cloneElement(children, { className })}</Link>;
}
