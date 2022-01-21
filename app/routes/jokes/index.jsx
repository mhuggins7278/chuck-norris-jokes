import { useLoaderData, Form, useSubmit, redirect } from "remix";
export let loader = async ({request}) => {
  const url = new URL(request.url);
  console.log(url)
  const category = url.searchParams.get("category") || "dev";
  console.log(category)
  const [jokesRes, categoriesRes] = await Promise.all([
    fetch(`https://api.chucknorris.io/jokes/random?category=${category}`),
    fetch(`https://api.chucknorris.io/jokes/categories`),
  ]);

  const joke = await jokesRes.json();
  const categories = await categoriesRes.json();
  const filteredCategories = categories.filter((c) => c !== "explicit");
  return { joke, filteredCategories };
};

export let action = async ({ request }) => {
  const formData = await request.formData();
  const category = formData['_fields']['category'][0]
  return redirect(`/jokes?category=${category}`);
}
export default function JokesIndexRoute() {
  const submit = useSubmit();
  function handleChange(event) {
    console.log(event);
    submit(event.currentTarget, { replace: true });
  }
  const { joke, filteredCategories } = useLoaderData();
  return (
    <div>
      <Form method="post" onChange={handleChange}>
        <label for="category">Choose a category:</label>
        <select name="category" id="category">
          <option disabled selected>Pick a Category</option>
          {filteredCategories.map((c) => {
            return <option value={c}>{c}</option>;
          })}
        </select>
        <button type="submit">Submit</button>
      </Form>
      <p>Here's a random joke:</p>
      <p>{joke.value}</p>
    </div>
  );
}
