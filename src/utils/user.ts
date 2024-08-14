
export function isAuthorized(allowedRoles: string[], userRole: string): boolean {
    return allowedRoles.includes(userRole);
}

export function isTeacher(userRole: string): boolean {
    const allowedRoles = ["COORDINATOR", "TEACHER", "DEPARTMENT_HEAD"]

    return allowedRoles.includes(userRole);
}

export function isTheSameUser(userId: number, id: number) {
    return userId === id
}

export function getFullName(...names: (string | null | undefined)[]): string {
    return names.filter(name => name !== null && name !== undefined && name.trim() !== '').join(' ');
}
