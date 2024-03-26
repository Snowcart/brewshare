import { PrismaClient } from '@prisma/client';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import bcrypt from 'bcrypt';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../_base';

export default async function register(req: NextApiRequest, res: NextApiResponse) {
  console.log("registering user");
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Create the user in the database
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // Return the created user (excluding the password)
    return res.status(201).json({ id: user.id, email: user.email });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(409).json({ message: 'A user with this email already exists' });
    }
    console.error('Failed to create user:', error);
    return res.status(500).json({ message: 'Failed to create user' });
  }
}