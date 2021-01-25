export const prefixCls = 'free-kits-doc';

export const sort = (data) => {
    return data?.sort((current, next) => {
        const currentOrder = current.order || 0;
        const nextOrder = next.order || 0;
        if (currentOrder > nextOrder) {
            return 1;
        }
        if (currentOrder === nextOrder) {
            return 0;
        }
        return -1;
    })
}
