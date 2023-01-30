using Microsoft.EntityFrameworkCore;
using System;

namespace API.Data
{
    public static class SeedData
    {
        public static void SeedDatabase(ApplicationDbContext context)
        {            
            //if (context.Employees.Count() == 0 && context.Departments.Count() == 0)
            if (context.Employees.Count() == 0)
            {
                //Department d1 = new Department { Name = "Sales" };
                //Department d2 = new Department { Name = "Development" };
                //Department d3 = new Department { Name = "Support" };
                //Department d4 = new Department { Name = "Facilities" };
                //context.Departments.AddRange(d1, d2, d3, d4);
                //context.SaveChanges();

                for (int i = 1; i <= 10; i++)
                {
                    context.Employees.Add(
                        new Employee
                        {
                            FirstName = "FirstName " + i.ToString(),
                            LastName = "LastName " + i.ToString(),
                            //Department = d2,
                        }
                    );
                }

                context.SaveChanges();
            }
        }
    }
}