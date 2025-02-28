import { Button as ShadButton } from "@/components/ui/button"

type TButtonProps = {
  children: React.ReactNode;
}

export default function Button({children, ...props}: TButtonProps) {
  return (
    <ShadButton {...props}>{children}</ShadButton>
  )
}
