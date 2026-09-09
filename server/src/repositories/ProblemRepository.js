class ProblemRepository {
  constructor(db) {
    this.db = db;
  }

  findAll() {
    return this.db
      .prepare("SELECT * FROM problems ORDER BY id")
      .all()
      .map(this.parseProblem);
  }

  findById(id) {
    const problem = this.db
      .prepare("SELECT * FROM problems WHERE id = ?")
      .get(id);

    return problem ? this.parseProblem(problem) : null;
  }

  parseProblem(problem) {
    return {
      ...problem,
      requirements: JSON.parse(problem.requirements)
    };
  }
}

module.exports = ProblemRepository;