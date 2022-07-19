import { FC } from 'react';

interface DataConfig {
  text: string;
  id: string;
}

interface Props {
  config: Array<DataConfig>;
  data: Array<any>;
}

export const Table: FC<Props> = ({ config, data }) => {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full border text-center">
              <thead className="border-b">
                <tr>
                  {config.map(({ text, id }) =>(
                    <th scope="col" key={id} className="text-sm font-medium text-gray-900 px-6 py-4 border-r last:border-none">
                      {text}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((d) => (
                  <tr key={d.id} className="border-b">
                    {config.map(({ id }) =>(
                      <td key={id} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r last:border-none">{d[id]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
