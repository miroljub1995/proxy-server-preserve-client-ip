sudo echo "export KUBELET_EXTRA_ARGS=--resolv-conf=/run/systemd/resolve/resolv.conf" > /etc/profile.d/setup-kubelet-args.sh
systemctl daemon-reload
service kubelet restart