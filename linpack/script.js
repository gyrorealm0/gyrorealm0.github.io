document.addEventListener('dragenter', ev => {
    ev.stopPropagation()
    ev.preventDefault()
})
document.addEventListener('dragover', ev => {
    ev.stopPropagation()
    ev.preventDefault()
})
document.addEventListener('drop', async ev => {
    ev.stopPropagation()
    ev.preventDefault()
    for (const file of ev.dataTransfer.files) {
        if (fileIndex >= 13) {
            break
        }
        const fileName = file.name
        if (fileName.endsWith('.csv')) {
            const index = ++fileIndex
            await new Promise((resolve, reject) => {
                Papa.parse(file, {
                    complete: (result) => {
                        processCSV(fileName, index, result.data)
                        resolve()
                    }
                })
            })
        }
        else if (fileName.endsWith('.json')) {
            const index = ++fileIndex
            processJSON(fileName, index, JSON.parse(await file.text()))
        }
    }
})
