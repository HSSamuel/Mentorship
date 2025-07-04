import { RequestStatus } from "@prisma/client";

const getUserIdForRequest = (req: Request): string | null => {
  if (!req.user) return null;
  if ("userId" in req.user) return req.user.userId as string;
  if ("id" in req.user) return req.user.id as string;
  return null;
};

export const createRequest = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { mentorId } = req.body;
  const menteeId = getUserIdForRequest(req);
  if (!menteeId) {
    res.status(401).json({ message: "Authentication error" });
    return;
  }
  if (!mentorId) {
    res.status(400).json({ message: "Mentor ID is required" });
    return;
  }
  try {
    const newRequest = await prisma.mentorshipRequest.create({
      data: { menteeId, mentorId, status: "PENDING" },
    });
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ message: "Server error while creating request" });
  }
};

export const getSentRequests = async (
  req: Request,
  res: Response
): Promise<void> => {
  const menteeId = getUserIdForRequest(req);
  if (!menteeId) {
    res.status(401).json({ message: "Authentication error" });
    return;
  }
  try {
    const requests = await prisma.mentorshipRequest.findMany({
      where: { menteeId },
      include: { mentor: { select: { profile: true } } },
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching sent requests" });
  }
};

export const getReceivedRequests = async (
  req: Request,
  res: Response
): Promise<void> => {
  const mentorId = getUserIdForRequest(req);
  if (!mentorId) {
    res.status(401).json({ message: "Authentication error" });
    return;
  }
  try {
    const requests = await prisma.mentorshipRequest.findMany({
      where: { mentorId },
      include: { mentee: { select: { profile: true } } },
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json(requests);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error fetching received requests" });
  }
};

export const updateRequestStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { status } = req.body;
  const mentorId = getUserIdForRequest(req);
  if (!mentorId) {
    res.status(401).json({ message: "Authentication error" });
    return;
  }
  if (!["ACCEPTED", "REJECTED"].includes(status)) {
    res.status(400).json({ message: "Invalid status" });
    return;
  }
  try {
    const request = await prisma.mentorshipRequest.findUnique({
      where: { id },
    });
    if (!request || request.mentorId !== mentorId) {
      res.status(404).json({ message: "Request not found or access denied" });
      return;
    }
    const updatedRequest = await prisma.mentorshipRequest.update({
      where: { id },
      data: { status: status as RequestStatus },
    });
    res.status(200).json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: "Server error while updating request" });
  }
};
