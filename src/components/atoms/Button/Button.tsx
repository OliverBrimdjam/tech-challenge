import { Button as ShadButton } from "@/components/ui/button"
import { ButtonHTMLAttributes } from "react"
import { VariantProps } from "class-variance-authority"

type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & 
  VariantProps<typeof ShadButton> & {
  children: React.ReactNode;
}

export default function Button({children, ...props}: TButtonProps) {
  return (
    <ShadButton {...props}>{children}</ShadButton>
  )
}
