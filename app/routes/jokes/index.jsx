import { useLoaderData, Form, redirect useFetcher} from 'remix'
export async function loader({ request }) {
    const url = new URL(request.url)
    console.log(url)
    const category = url.searchParams.get('category') || 'dev'
    console.log(category)
    const [jokesRes, categoriesRes] = await Promise.all([
        fetch(`https://api.chucknorris.io/jokes/random?category=${category}`),
        fetch(`https://api.chucknorris.io/jokes/categories`),
    ])

    const joke = await jokesRes.json()
    const categories = await categoriesRes.json()
    const filteredCategories = categories.filter((c) => c !== 'explicit')
    return { joke, filteredCategories }
}

export async function action({ request }) {
    const formData = await request.formData()
    const category = formData._fields.category[0]
    return 
}
export default function JokesIndexRoute() {
  const fetcher = useFetcher()
    const { joke, filteredCategories } = useLoaderData()
    return (
        <div>
            <fetcher.Form method="post">
                <label htmlFor="category">Choose a category:</label>
                <select name="category" id="category">
                    <option disabled selected>
                        Pick a Category
                    </option>
                    {filteredCategories.map((c) => {
                        return <option value={c}>{c}</option>
                    })}
                </select>
                <button type="submit">Submit</button>
      </fetcher.Form>
            <p>Here's a random joke:</p>
            <p>{joke.value}</p>
        </div>
    )
}
