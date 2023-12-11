interface Props {
  children: React.ReactNode;
}

const Container = ({ children }: Props) => {
  return <div className="w-full px-5 md:max-w-5xl mx-auto">{children}</div>;
};

export default Container;
