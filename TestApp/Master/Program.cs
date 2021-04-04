using Polly;
using Polly.Bulkhead;
using System;
using System.Collections.Concurrent;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace Master
{
    class Program
    {
        static AsyncBulkheadPolicy GetBulkPolicy(int parallel)
        {
            return Policy.BulkheadAsync(parallel, int.MaxValue);
        }

        class Fail
        {
            public long T { get; set; }
            public int Val { get; set; }
        }

        static async Task Run(int n, int parallel)
        {
            Console.WriteLine($"Sending {n} requests with {parallel} in parallel.");
            if (n == 0 || parallel == 0)
            {
                throw new ArgumentOutOfRangeException();
            }

            var clients = Enumerable.Range(0, parallel).Select(e => new HttpClient() { Timeout = TimeSpan.FromSeconds(1) }).ToList();

            var elems = Enumerable.Range(0, n);
            var polly = GetBulkPolicy(parallel);

            var failCount = 0;
            var fails = new ConcurrentBag<Fail>();

            var sw = Stopwatch.StartNew();
            var resTimeAccumulator = 0L;
            await Task.WhenAll(elems.Select(e => polly.ExecuteAsync(async () =>
            {
                if (e == (n / 2))
                {
                    Console.WriteLine("Half!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                }
                var client = clients[e % parallel];
                var t1 = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
                try
                {
                    var a = await client.GetAsync("http://192.168.0.200:8084/api/posts/by/id/60681951aec9fc001f21703f");
                    a.EnsureSuccessStatusCode();
                    var t2 = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
                    Interlocked.Add(ref resTimeAccumulator, t2 - t1);
                }
                catch (Exception e)
                {
                    var newFailCount = Interlocked.Increment(ref failCount);
                    fails.Add(new Fail { T = DateTimeOffset.UtcNow.ToUnixTimeSeconds(), Val = newFailCount });
                    //Console.WriteLine("Fail");
                }

            })));
            sw.Stop();

            var sec = sw.Elapsed.TotalSeconds;
            Console.WriteLine($"{parallel} clients: {n / sec} req/s, average response time: {resTimeAccumulator / n} ms, failed: {fails.Count}");
            var failsJson = JsonSerializer.Serialize(fails.GroupBy(x => x.T).Select(x => new Fail { T = x.Key, Val = x.Max(x => x.Val) }).ToList(), new JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText("fails.json", failsJson);
        }

        static async Task Main(string[] args)
        {
            var n = 10000;
            var t1 = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
            await Run(n, 20);
            var t2 = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
            Console.WriteLine($"Start: {t1}, End: {t2}");
        }
    }
}
