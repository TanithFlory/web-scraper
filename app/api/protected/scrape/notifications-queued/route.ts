import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/api/utils/db";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const id = Number(req.headers.get("id"));

    const priceDrops = await prisma.priceDrop.findMany({
      where: {
        userId: id,
      },
      select: {
        product: true,
        id: false,
      },
    });
    return NextResponse.json({ data: priceDrops }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
export async function POST(req: NextRequest, res: NextResponse) {
  const id = Number(req.headers.get("id"));
  try {
    const data = await req.json();
    const { productId } = data;
    const productDetails = await prisma.product.findFirst({
      where: { productId },
    });

    if (!productDetails) return;

    const totalNotificationQueues = await prisma.priceDrop.count({
      where: {
        userId: id,
      },
    });

    if (totalNotificationQueues >= 5) {
      return NextResponse.json(
        {
          message:
            "You have reached maximum limit of price drop notifications (5).",
        },
        { status: 400 }
      );
    }
    const existingEntry = await prisma.priceDrop.findUnique({
      where: {
        productId_userId: {
          productId: productDetails.id,
          userId: id,
        },
      },
    });

    if (existingEntry) {
      return NextResponse.json(
        {
          message:
            "You are already subscribing to this, visit settings to unsubscribe.",
        },
        { status: 409 }
      );
    }

    await prisma.priceDrop.create({
      data: {
        product: { connect: { id: productDetails.id } },
        user: { connect: { id } },
      },
    });
    return NextResponse.json({ message: "Successful" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();
    const { priceDropId } = data;
    const id = Number(req.headers.get("id"));

    const priceDrop = await prisma.priceDrop.findUnique({ where: priceDropId });

    if (priceDrop?.userId !== id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await prisma.priceDrop.delete({
      where: { id: priceDropId },
    });

    return NextResponse.json({ message: "Successful!" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error!" },
      { status: 500 }
    );
  }
}
