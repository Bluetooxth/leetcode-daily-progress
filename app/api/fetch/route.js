import { GraphQLClient, gql } from "graphql-request";
import { NextResponse } from "next/server";
import dayjs from "dayjs";

const LEETCODE_GRAPHQL_ENDPOINT = "https://leetcode.com/graphql";

const QUERY_RECENT_SUBMISSIONS = gql`
  query RecentSubmissions($username: String!) {
    recentSubmissionList(username: $username) {
      title
      timestamp
      statusDisplay
    }
  }
`;

const QUERY_PROBLEM_DETAILS = gql`
  query ProblemDetails($titleSlug: String!) {
    question(titleSlug: $titleSlug) {
      title
      difficulty
    }
  }
`;

const deduplicateSubmissions = (submissions) => {
  const seen = new Set();
  return submissions.filter((submission) => {
    if (seen.has(submission.title)) {
      return false;
    }
    seen.add(submission.title);
    return true;
  });
};

const slugifyTitle = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, "-");
};

const fetchProblemDetails = async (title) => {
  const titleSlug = slugifyTitle(title);
  const client = new GraphQLClient(LEETCODE_GRAPHQL_ENDPOINT);
  const data = await client.request(QUERY_PROBLEM_DETAILS, { titleSlug });
  return data.question.difficulty;
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 }
    );
  }

  try {
    const client = new GraphQLClient(LEETCODE_GRAPHQL_ENDPOINT);
    const data = await client.request(QUERY_RECENT_SUBMISSIONS, { username });

    let submissions = data.recentSubmissionList || [];
    submissions = deduplicateSubmissions(submissions);

    const today = dayjs().startOf("day");
    const todaySubmissions = submissions.filter((submission) => {
      const submissionDate = dayjs.unix(submission.timestamp);
      return (
        submissionDate.isAfter(today) && submission.statusDisplay === "Accepted"
      );
    });

    const problemsWithDifficulty = await Promise.all(
      todaySubmissions.map(async (submission) => {
        const difficulty = await fetchProblemDetails(submission.title);
        return { title: submission.title, difficulty };
      })
    );

    return NextResponse.json({
      username,
      solvedToday: problemsWithDifficulty.length,
      problems: problemsWithDifficulty,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch recent submissions" },
      { status: 500 }
    );
  }
}
