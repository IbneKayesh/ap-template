
function PageGoNext2(action, dataid) {
    switch (action) {
        case 'div-page-list-business':
            $('#div-page-entry-business').addClass('d-none');
            $('#btn-back-to-entry').removeClass('d-none');
            $('#div-page-list-business').removeClass('d-none');

            break;
        case 'div-page-entry-business':
            $('#div-page-entry-business').removeClass('d-none');
            $('#btn-back-to-entry').addClass('d-none');
            $('#div-page-list-business').addClass('d-none');

            break;

        default:
            console.log('Invalid action');
            break;
    }
}