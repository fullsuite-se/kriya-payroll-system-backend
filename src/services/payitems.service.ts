import prisma from "../config/prisma";

export const findAllPayitems = async () => {
    return await prisma.payitem.findMany();
};