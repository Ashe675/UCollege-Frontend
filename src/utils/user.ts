
export function isAuthorized(allowedRoles: string[], userRole: string): boolean {
    return allowedRoles.includes(userRole);
}

export function isTeacher(userRole: string): boolean {
    const allowedRoles = ["COORDINATOR", "TEACHER", "DEPARTMENT_HEAD"]

    return allowedRoles.includes(userRole);
}