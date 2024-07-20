document.addEventListener('DOMContentLoaded', () => {
    const url = new URL(window.location.href);

    const params = new URLSearchParams(url.search);

    const groupId = params.get('group_id');
    const moduleId = params.get('module_id');
    const period = params.get('period');

    console.log('Group ID:', groupId);
    console.log('Module ID:', moduleId);
    console.log('Period:', period);

    const _url = `${config.baseUrl}/teachers/get-group-details?group_id=${groupId},module_id=${moduleId},period=2024-2`


}); 