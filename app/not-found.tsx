export const metadata = {
  title: 'Page not found',
  description: 'The page you were looking for could not be found.',
};

export default function NotFound() {
  return (
    <div className="govuk-width-container govuk-!-margin-top-6">
      <h1 className="govuk-heading-xl">Page not found</h1>
      <p className="govuk-body">If you typed the web address, check it is correct.</p>
      <p className="govuk-body">If you pasted the web address, check you copied the entire address.</p>
      <p className="govuk-body">
        If the web address is correct or you selected a link or button, you can use the links in the header to find what you need.
      </p>
    </div>
  );
}
