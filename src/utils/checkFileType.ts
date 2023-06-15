function getExtension(fileName: string) {
    var parts = fileName.split('.');
    return parts[parts.length - 1];
}

export function isImage(fileName: string) {
    var ext = getExtension(fileName);
    switch (ext.toLowerCase()) {
        case 'jpg':
        case 'gif':
        case 'bmp':
        case 'png':
            //etc
            return true;
    }
    return false;
}

export function isVideo(fileName: string) {
    var ext = getExtension(fileName);
    switch (ext.toLowerCase()) {
        case 'm4v':
        case 'avi':
        case 'mpg':
        case 'mp4':
            // etc
            return true;
    }
    return false;
}