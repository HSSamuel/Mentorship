const getUserIdFromRequest = (req: Request): string | null => {
  if (!req.user) return null;
  if ("userId" in req.user) return req.user.userId as string;
  if ("id" in req.user) return req.user.id as string;
  return null;
};

export const getAllMentors = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const mentors = await prisma.user.findMany({
      where: { role: "MENTOR" },
      select: {
        id: true,
        email: true,
        profile: true,
      },
    });
    res.status(200).json(mentors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching mentors." });
  }
};

export const getAvailableSkills = async (
  req: Request,
  res: Response
): Promise<void> => {
  const skills = [
    "Marketing",
    "UI/UX",
    "Backend Development",
    "Product Management",
    "Fundraising",
  ];
  res.status(200).json(skills);
};

export const updateMyProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = getUserIdFromRequest(req);
  if (!userId) {
    res.status(401).json({ message: "Authentication error" });
    return;
  }
  const { name, bio, skills, goals } = req.body;
  try {
    const profile = await prisma.profile.upsert({
      where: { userId },
      update: { name, bio, skills, goals },
      create: { userId, name, bio, skills, goals },
    });
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Error updating profile" });
  }
};

export const getMentorStats = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = getUserIdFromRequest(req);
  if (!userId) {
    res.status(401).json({ message: "Authentication error" });
    return;
  }
  try {
    const menteeCount = await prisma.mentorshipRequest.count({
      where: { mentorId: userId, status: "ACCEPTED" },
    });
    const pendingRequests = await prisma.mentorshipRequest.count({
      where: { mentorId: userId, status: "PENDING" },
    });
    const upcomingSessions = await prisma.session.count({
      where: { mentorId: userId, date: { gte: new Date() } },
    });
    res.status(200).json({ menteeCount, pendingRequests, upcomingSessions });
  } catch (error) {
    res.status(500).json({ message: "Error fetching mentor stats." });
  }
};

export const getMenteeStats = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = getUserIdFromRequest(req);
  if (!userId) {
    res.status(401).json({ message: "Authentication error" });
    return;
  }
  try {
    const mentorCount = await prisma.mentorshipRequest.count({
      where: { menteeId: userId, status: "ACCEPTED" },
    });
    const pendingRequests = await prisma.mentorshipRequest.count({
      where: { menteeId: userId, status: "PENDING" },
    });
    const upcomingSessions = await prisma.session.count({
      where: { menteeId: userId, date: { gte: new Date() } },
    });
    res.status(200).json({ mentorCount, pendingRequests, upcomingSessions });
  } catch (error) {
    res.status(500).json({ message: "Error fetching mentee stats." });
  }
};
