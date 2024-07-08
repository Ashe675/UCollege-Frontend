import z from 'zod';

//* Inscripciones
export type InscriptionData = {
    name: string;
    lastName: string;
    principalCareerId: string;
    secondaryCareerId: string;
    dni: string;
    photoCertificate: FileList | null;
    phoneNumber: string;
    email: string;
    regionalCenterId: string;
};


export const inscriptionSchema = z.object({

    person: z.object({
        firstName: z.string(),
        middleName: z.string().nullable(),
        lastName: z.string(),
        secondLastName: z.string().nullable(),
        dni: z.string(),
        email: z.string().email(),
    })
    ,
    careers: z.array(z.object({
        name: z.string(),
        tests: z.array(z.object({
            name: z.string(),
            code: z.string(),
            minScore: z.number(),
        }))
    }))
})


export type InscriptionDetail = z.infer<typeof inscriptionSchema>

// Esquema para la carrera
const CareerSchema = z.object({
    id: z.number(),
    name: z.string(),
});

// Esquema para la relación entre centros regionales y carreras
const RegionalCenterCareerSchema = z.object({
    career: CareerSchema,
});

const RegionalCenterCareersSchema = z.array(RegionalCenterCareerSchema);

export type RegionalCareers = z.infer<typeof RegionalCenterCareersSchema>

// Esquema para el centro regional
const RegionalCenterSchema = z.object({
    id: z.number(),
    name: z.string(),
    regionalCentersCareer: z.array(RegionalCenterCareerSchema),
});

// Esquema para el array de centros regionales
export const RegionalCentersSchema = z.array(RegionalCenterSchema);

export type RegionalCenters = z.infer<typeof RegionalCentersSchema>

//* Resultados
export type SearchData = {
    dni: string;
}

export const resultDetailSchema = z.object({
    person: z.object({
        firstName: z.string(),
        middleName: z.string().nullable(),
        lastName: z.string(),
        secondLastName: z.string().nullable(),
        dni: z.string(),
        email: z.string().email(),
    }),
    results: z.array(z.object({
        testName: z.string(),
        code: z.string(),
        score: z.number(),
        message: z.string(),
    })),
    opinion: z.object({
        id: z.number(),
        message: z.string()

    })
})

export type ResultTest = {
    testName: string;
    code: string;
    score: number;
    message: string;
}

export type ResultDetail = z.infer<typeof resultDetailSchema>
//

export type RegionalCenter = {
    id: number
    name: string
    careers: {
        id: number
        name: string
    }[]
}[]