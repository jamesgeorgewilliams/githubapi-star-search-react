interface Props {language: string, stargazers_count: number, name: string }

const Card: React.FC<Props> = ({name, stargazers_count}): JSX.Element => {
    return (
        <li>
            <p>{name}</p>
            <p>{stargazers_count}</p> 
        </li>
    )
}

export default Card;