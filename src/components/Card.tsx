interface Props {language: string, stargazers_count: number, name: string }

const Card: React.FC<Props> = ({name, stargazers_count}): JSX.Element => {
    return (
        <li>
            <p>{name}</p>
            <p>{stargazers_count}<span>{' \u2606'}</span></p> 
        </li>
    )
}

export default Card;