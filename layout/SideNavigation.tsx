interface Page {
  url: string;
  title: string;
}

interface Props {
  pages: Page[];
}

export const SideNavigtion = ({ pages }: Props) => {
  return (
    <nav className="w-60 grow-0 h-full shadow-md pt-8">
      <ul className="relative">
        {
          pages.map(({ title, url }) => (
            <li key={url} className="relative">
              <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href={url} data-mdb-ripple="true" data-mdb-ripple-color="dark">{title}</a>
            </li>
          ))
        }
      </ul>
    </nav>
  );
};
