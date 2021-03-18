/**
 * Dispatch un evenement pour le gestionnaire de notifications userAction
 * 
 * @param m Le message 
 */
export const dispatchNotification = (m) => {
    var event = new CustomEvent(
        'userAction', { 
            'detail': {
                message: m
            } 
        }
    );
    document.dispatchEvent(event);
}