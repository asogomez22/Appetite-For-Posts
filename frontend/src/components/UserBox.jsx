export default function UserBox({title, description, id}) {
    return (
        <article>
            <h2>{title}</h2>
            <p>{description}</p>
            <p>{id}</p>
        </article>

    )
}