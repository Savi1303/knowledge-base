import React from "react"

const FileCard = ({ File }) => {
    return(
        <div className="text-center">
            <h3 className="font-bold text-4xl">{File.title}</h3>
            <p className="py-2 text-lg">{File.url}</p>
            <div className="py-2 text-slate-600 text-2xl">{File.rating}</div>
        </div>
    )
}

export default FileCard