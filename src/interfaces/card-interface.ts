export default interface ICardProps {
  children?: React.ReactNode,
  img?: {
    src: string;
    alt?: string;
  },
  title?: string;
}