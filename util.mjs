export function notifyUser(title, msg, iconUrl, type) {
    chrome.notifications.create('notification_x', {
        type: type ?? 'basic',
        iconUrl: iconUrl ?? 'logo_128.png',
        title: title ?? 'Limit reached!',
        message: msg ?? `Uh oh! Looks like you've reached your limit!`,
    });
}
