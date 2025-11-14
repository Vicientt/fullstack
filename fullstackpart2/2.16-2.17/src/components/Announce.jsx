const Announce = ({name}) => {
    if (name === '') return null

    return (
        <div className = "announce">
            Added {name}
        </div>
    )
}

export default Announce