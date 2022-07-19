export const LoadingIndicator = () => {
  return (
    <div className="flex fixed h-full w-full justify-center items-center">
      <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed bg-slate-200 opacity-50"/>
    </div>
  );
};
