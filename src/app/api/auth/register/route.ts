import { NextRequest, NextResponse } from "next/server"
import { db } from '@/db/db'
import { users } from '@/db/schema'
import bcrypt from "bcryptjs"
import { eq } from 'drizzle-orm';

export async function POST(request : Request){
    const {name, email, password, confirmPassword} = await request.json()
   
    const reds = db.select().from(users)
          .where(eq(users.name, name))
          .get();

    
    if (reds){
        //console.log(reds)
        return NextResponse.json({
            message: "name"
        });
    }

    /// todo
    if (password !== confirmPassword){
        return NextResponse.json({
            message: "password"
        });
    }


    const hashedPassword = await bcrypt.hash(password, 12)

    const data = {
        name: name,
        email: email,
        password: hashedPassword
    }

    //console.log(data)
    const red = await db.insert(users).values(data);
    //console.log(red)
    return NextResponse.json('re ...')
}