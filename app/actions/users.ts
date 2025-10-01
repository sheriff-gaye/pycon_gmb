// 'use server'

// import { clerkClient } from '@clerk/nextjs/server';
// import { auth } from '@clerk/nextjs/server';

// interface GetUsersParams {
//   limit?: number;
//   offset?: number;
// }

// interface UserLog {
//   id: string;
//   firstName: string | null;
//   lastName: string | null;
//   emailAddresses: Array<{ emailAddress: string; id: string }>;
//   createdAt: number;
//   lastSignInAt: number | null;
//   lastActiveAt: number | null;
//   imageUrl: string;
//   banned: boolean;
//   locked: boolean;
// }

// interface GetUsersResponse {
//   users: UserLog[];
//   totalCount: number;
//   hasNextPage: boolean;
//   success: boolean;
//   error?: string;
// }

// export async function getUsers({ limit = 50, offset = 0 }: GetUsersParams = {}): Promise<GetUsersResponse> {
//   try {
//     // Check if the user is authenticated and has admin permissions
//     const { userId } = await auth();
    
//     if (!userId) {
//       return {
//         users: [],
//         totalCount: 0,
//         hasNextPage: false,
//         success: false,
//         error: 'Unauthorized - Please sign in'
//       };
//     }

//     // Optional: Add additional authorization check for admin role
//     // const user = await clerkClient.users.getUser(userId);
//     // if (user.publicMetadata?.role !== 'admin') {
//     //   return {
//     //     users: [],
//     //     totalCount: 0,
//     //     hasNextPage: false,
//     //     success: false,
//     //     error: 'Forbidden - Admin access required'
//     //   };
//     // }

//     // Fetch users from Clerk
//     const response = await clerkClient.users.getUserList({
//       limit,
//       offset,
//       orderBy: '-created_at', // Order by creation date, newest first
//     });

//     // Transform the data to match your UserLog interface
//     const users: UserLog[] = response.data.map((user) => ({
//       id: user.id,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       emailAddresses: user.emailAddresses.map(email => ({
//         emailAddress: email.emailAddress,
//         id: email.id,
//       })),
//       createdAt: user.createdAt,
//       lastSignInAt: user.lastSignInAt,
//       lastActiveAt: user.lastActiveAt,
//       imageUrl: user.imageUrl,
//       banned: user.banned,
//       locked: user.locked,
//     }));

//     return {
//       users,
//       totalCount: response.totalCount,
//       hasNextPage: response.totalCount > offset + limit,
//       success: true,
//     };

//   } catch (error) {
//     console.error('Error fetching users:', error);
//     return {
//       users: [],
//       totalCount: 0,
//       hasNextPage: false,
//       success: false,
//       error: 'Failed to fetch users from Clerk',
//     };
//   }
// }

// // Additional server actions you might need for user management

// export async function banUser(userId: string): Promise<{ success: boolean; error?: string }> {
//   try {
//     const { userId: currentUserId } = auth();
    
//     if (!currentUserId) {
//       return { success: false, error: 'Unauthorized' };
//     }

//     await clerkClient.users.banUser(userId);
//     return { success: true };
//   } catch (error) {
//     console.error('Error banning user:', error);
//     return { success: false, error: 'Failed to ban user' };
//   }
// }

// export async function unbanUser(userId: string): Promise<{ success: boolean; error?: string }> {
//   try {
//     const { userId: currentUserId } = auth();
    
//     if (!currentUserId) {
//       return { success: false, error: 'Unauthorized' };
//     }

//     await clerkClient.users.unbanUser(userId);
//     return { success: true };
//   } catch (error) {
//     console.error('Error unbanning user:', error);
//     return { success: false, error: 'Failed to unban user' };
//   }
// }

// export async function lockUser(userId: string): Promise<{ success: boolean; error?: string }> {
//   try {
//     const { userId: currentUserId } = auth();
    
//     if (!currentUserId) {
//       return { success: false, error: 'Unauthorized' };
//     }

//     await clerkClient.users.lockUser(userId);
//     return { success: true };
//   } catch (error) {
//     console.error('Error locking user:', error);
//     return { success: false, error: 'Failed to lock user' };
//   }
// }

// export async function unlockUser(userId: string): Promise<{ success: boolean; error?: string }> {
//   try {
//     const { userId: currentUserId } = auth();
    
//     if (!currentUserId) {
//       return { success: false, error: 'Unauthorized' };
//     }

//     await clerkClient.users.unlockUser(userId);
//     return { success: true };
//   } catch (error) {
//     console.error('Error unlocking user:', error);
//     return { success: false, error: 'Failed to unlock user' };
//   }
// }

// export async function deleteUser(userId: string): Promise<{ success: boolean; error?: string }> {
//   try {
//     const { userId: currentUserId } = auth();
    
//     if (!currentUserId) {
//       return { success: false, error: 'Unauthorized' };
//     }

//     // Don't allow users to delete themselves
//     if (currentUserId === userId) {
//       return { success: false, error: 'Cannot delete your own account' };
//     }

//     await clerkClient.users.deleteUser(userId);
//     return { success: true };
//   } catch (error) {
//     console.error('Error deleting user:', error);
//     return { success: false, error: 'Failed to delete user' };
//   }
// }