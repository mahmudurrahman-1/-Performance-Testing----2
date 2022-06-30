# Performance-Testing1

Performance test of [Lifecharger](https://lifecharger.org) website

4 HTTP Request has been used

- [${base}](https://lifecharger.org)
- [About](https://lifecharger.org/about)
- [Archives](https://lifecharger.org/archives)
- [Archives](https://lifecharger.org/2-minute-rule)


**Number of Threads (User) = 200** <br />
**Ramp-up Period (Second) = 10**

**Error Rate : 26.11%**

## [Performance Test Report (See Live)](https://mahmudur-perform-test2.netlify.app/)

# Importent Note

1. What is **JMeter**?
   - Performance test application
   - Build using Java
   - Free & Open Source
   - Recording
   - CLI
   - Reports
2. Step of create Jmeter Test
   - Start JMeter
   - Create a TestPlan
   - Create a Thread Group (Users)
   - Add a Sampler (Http)
   - Add Listeners
   - Run the Test
3. JMeter **Listener** is a component that shows the results of the samples.
   The results can be shown in a tree, tables, graphs or simply written to a log file.
   Listeners provide pictorial representation of data gathered by JMeter about those test cases as a sampler component of JMeter is executed.
   Few most used listener
   1. View Results in Table
   2. View Results Tree
   3. Aggregate Report
   4. Graph Results
   5. Summary Report
   6. Simple Data Writer
4. JMeter **Assertions** are the component of a test that allow a user to validate that the response JMeter receives matches expected criteria. Few most used assertions
   1. Response Assertion
   2. Duration Assertion
   3. Size Assertion
   4. HTML Assertion
   5. XML JSON Assertion
   6. XPATH Assertion
5. Few most used JMeter Config Elements
   - User Defined Variables
   - HTTP Authorization Manager
   - HTTP Cache Manager
   - HTTP Cookie Manager
   - Login Config Element
   - CSV Data Set Config
   - FTP Request Defaults
   - HTTP Request Defaults
   - HTTP Header Manager
6. Run JMeter test from command line
   - Open CMD
   - Command for result
     - **jmeter -n -t "..\test_file.jmx" -l "..\result_file"**
   - Command for result & report
     - **jmeter -n -t "..\test_file.jmx" -l "..\result_file" -e -o "..\report_folder"**
   - Command for report from an existing result file
     - **jmeter -g "..\result_file" -o "..\report_folder"**
