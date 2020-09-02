const size = {
    mobile: '375px',
    // desktop: '1440px'
    desktop: '1024px'
}

const device = {
    mobile: `(min-width : ${size.mobile})`,
    desktop: `(min-width : ${size.desktop})`
}

export { size, device };